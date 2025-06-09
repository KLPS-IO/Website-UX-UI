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

/* ./subviews/content/main.twig */
class __TwigTemplate_4d8388f91cea83232ded0ad42d3212c5 extends Template
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
        // line 24
        yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/header/start_form.twig");
        yield " <!-- main form -->

    ";
        // line 27
        yield "    ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "EM", [], "any", false, false, true, 27), "ScriptsAndHiddenInputs", [], "any", false, false, true, 27), 27, $this->source);
        yield "

    ";
        // line 30
        yield "    ";
        yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/messages/no_js_alert.twig");
        yield "

    ";
        // line 33
        yield "    ";
        yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/privacy/allinone_mode_welcome_privacy.twig");
        yield "

    ";
        // line 42
        yield "    ";
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aGroups", [], "any", false, false, true, 42));
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
        foreach ($context['_seq'] as $context["_key"] => $context["aGroup"]) {
            // line 43
            yield "        ";
            yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/survey/group.twig");
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
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['aGroup'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 45
        yield "
    ";
        // line 47
        yield "    ";
        if (CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aNavigator", [], "any", false, false, true, 47), "show", [], "any", false, false, true, 47)) {
            // line 48
            yield "        ";
            yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/navigation/navigator.twig");
            yield "
    ";
        }
        // line 50
        yield "
</form> <!-- main form -->
";
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "./subviews/content/main.twig";
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
        return array (  110 => 50,  104 => 48,  101 => 47,  98 => 45,  81 => 43,  63 => 42,  57 => 33,  51 => 30,  45 => 27,  40 => 24,);
    }

    public function getSourceContext()
    {
        return new Source("", "./subviews/content/main.twig", "/Users/emmamendez/Source/KLPS/Webite-UX-UI/limesurvey/limesurvey/themes/survey/fruity_twentythree/views/subviews/content/main.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("for" => 42, "if" => 47);
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
