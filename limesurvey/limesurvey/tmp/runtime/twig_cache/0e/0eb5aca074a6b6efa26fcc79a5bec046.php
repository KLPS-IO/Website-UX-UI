<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\CoreExtension;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* ./subviews/survey/group_subviews/group_container.twig */
class __TwigTemplate_2cee9e7371b034732828d63fdcf6cc72 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->extensions[SandboxExtension::class];
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 20
        yield "
<div class=\"";
        // line 21
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 21), "groupcontainer", [], "any", false, false, true, 21), 21, $this->source);
        yield " space-col\" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 21), "groupcontainer", [], "any", false, false, true, 21), 21, $this->source);
        yield ">

    ";
        // line 24
        yield "    ";
        yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/survey/group_subviews/group_name.twig");
        yield "

    ";
        // line 27
        yield "    ";
        yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/survey/group_subviews/group_desc.twig");
        yield "

    ";
        // line 34
        yield "
    <!-- PRESENT THE QUESTIONS -->
    ";
        // line 36
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable(CoreExtension::getAttribute($this->env, $this->source, ($context["aGroup"] ?? null), "aQuestions", [], "any", false, false, true, 36));
        $context['loop'] = [
          'parent' => $context['_parent'],
          'index0' => 0,
          'index'  => 1,
          'first'  => true,
        ];
        if (is_array($context['_seq']) || (is_object($context['_seq']) && $context['_seq'] instanceof \Countable)) {
            $length = count($context['_seq']);
            $context['loop']['revindex0'] = $length - 1;
            $context['loop']['revindex'] = $length;
            $context['loop']['length'] = $length;
            $context['loop']['last'] = 1 === $length;
        }
        foreach ($context['_seq'] as $context["_key"] => $context["aQuestion"]) {
            // line 37
            yield "         ";
            yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/survey/question_container.twig");
            yield "
    ";
            ++$context['loop']['index0'];
            ++$context['loop']['index'];
            $context['loop']['first'] = false;
            if (isset($context['loop']['length'])) {
                --$context['loop']['revindex0'];
                --$context['loop']['revindex'];
                $context['loop']['last'] = 0 === $context['loop']['revindex0'];
            }
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['aQuestion'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 39
        yield "
    <!-- Hidden inputs -->
    ";
        // line 41
        if ((CoreExtension::getAttribute($this->env, $this->source, ($context["aGroup"] ?? null), "show_last_group", [], "any", false, false, true, 41) == true)) {
            // line 42
            yield "        <input type='hidden' name='lastgroup' value='";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aGroup"] ?? null), "lastgroup", [], "any", false, false, true, 42), 42, $this->source);
            yield "' id='lastgroup' />
    ";
        }
        // line 44
        yield "
    ";
        // line 45
        if ((CoreExtension::getAttribute($this->env, $this->source, ($context["aGroup"] ?? null), "show_last_answer", [], "any", false, false, true, 45) == true)) {
            // line 46
            yield "        <input type='hidden' name='lastanswer' value='";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aGroup"] ?? null), "lastanswer", [], "any", false, false, true, 46), 46, $this->source);
            yield "' id='lastanswer' />
    ";
        }
        // line 48
        yield "</div>
";
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "./subviews/survey/group_subviews/group_container.twig";
    }

    /**
     * @codeCoverageIgnore
     */
    public function isTraitable()
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo()
    {
        return array (  123 => 48,  117 => 46,  115 => 45,  112 => 44,  106 => 42,  104 => 41,  100 => 39,  83 => 37,  66 => 36,  62 => 34,  56 => 27,  50 => 24,  43 => 21,  40 => 20,);
    }

    public function getSourceContext()
    {
        return new Source("", "./subviews/survey/group_subviews/group_container.twig", "/Users/emmamendez/Source/KLPS/Webite-UX-UI/limesurvey/limesurvey/themes/survey/fruity_twentythree/views/subviews/survey/group_subviews/group_container.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("for" => 36, "if" => 41);
        static $filters = array();
        static $functions = array("include" => 24);

        try {
            $this->sandbox->checkSecurity(
                ['for', 'if'],
                [],
                ['include'],
                $this->source
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->source);

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }
}
