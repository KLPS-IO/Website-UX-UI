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

/* ./subviews/messages/warnings.twig */
class __TwigTemplate_430c13a8bc5d4e68707b5086ebbe389e extends Template
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
        // line 27
        yield "
";
        // line 29
        if (((CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "active", [], "any", false, false, true, 29) != "Y") &&  !CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "popupPreview", [], "any", false, false, true, 29))) {
            // line 30
            yield "    <!-- Preview mode warning -->
    <div class=\"";
            // line 31
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 31), "activealert", [], "any", false, false, true, 31), 31, $this->source);
            yield " alert alert-warning alert-dismissible fade in show alert-dismissible\" ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 31), "activealert", [], "any", false, false, true, 31), 31, $this->source);
            yield " >
        <button  ";
            // line 32
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 32), "activealertbutton", [], "any", false, false, true, 32), 32, $this->source);
            yield " class=\"";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 32), "activealertbutton", [], "any", false, false, true, 32), 32, $this->source);
            yield " btn-close\" ></button>
        ";
            // line 33
            yield gT("This survey is currently not active. You will not be able to save your responses.");
            yield "
    </div>
";
        }
        // line 36
        yield "
";
        // line 38
        if (CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "errorHtml", [], "any", false, false, true, 38), "show", [], "any", false, false, true, 38)) {
            // line 39
            yield "    <p class=' ";
            yield " fade in show alert-dismissible alert alert-danger ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 39), "errorHtml", [], "any", false, false, true, 39), 39, $this->source);
            yield " ' role='alert'>
        <button  ";
            // line 40
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 40), "errorHtmlbutton", [], "any", false, false, true, 40), 40, $this->source);
            yield " class=\"";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 40), "errorHtmlbutton", [], "any", false, false, true, 40), 40, $this->source);
            yield " btn-close\" ></button>
    ";
            // line 41
            $context['_parent'] = $context;
            $context['_seq'] = CoreExtension::ensureTraversable(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "errorHtml", [], "any", false, false, true, 41), "messages", [], "any", false, false, true, 41));
            foreach ($context['_seq'] as $context["_key"] => $context["aMessage"]) {
                // line 42
                yield "        <!-- Error Html warnings -->
            ";
                // line 43
                yield $this->sandbox->ensureToStringAllowed($context["aMessage"], 43, $this->source);
                yield "
            <br/>
    ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['aMessage'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 46
            yield "    </p>
";
        }
        // line 48
        yield "
";
        // line 49
        yield makeFlashMessage();
        yield "
";
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "./subviews/messages/warnings.twig";
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
        return array (  106 => 49,  103 => 48,  99 => 46,  90 => 43,  87 => 42,  83 => 41,  77 => 40,  71 => 39,  69 => 38,  66 => 36,  60 => 33,  54 => 32,  48 => 31,  45 => 30,  43 => 29,  40 => 27,);
    }

    public function getSourceContext()
    {
        return new Source("", "./subviews/messages/warnings.twig", "/Users/emmamendez/Source/KLPS/Webite-UX-UI/limesurvey/limesurvey/themes/survey/fruity_twentythree/views/subviews/messages/warnings.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 29, "for" => 41);
        static $filters = array();
        static $functions = array("gT" => 33, "makeFlashMessage" => 49);

        try {
            $this->sandbox->checkSecurity(
                ['if', 'for'],
                [],
                ['gT', 'makeFlashMessage'],
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
