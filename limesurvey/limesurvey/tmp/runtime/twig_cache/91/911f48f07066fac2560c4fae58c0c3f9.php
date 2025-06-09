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

/* ./subviews/survey/question_subviews/question_text_content.twig */
class __TwigTemplate_4e788e36c4cf29731569ae5a9ca83e5f extends Template
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
        if ((CoreExtension::getAttribute($this->env, $this->source, ($context["aQuestion"] ?? null), "mandatory", [], "any", false, false, true, 20) == "Y")) {
            // line 21
            yield "    ";
            yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/survey/question_subviews/asterisk.twig");
            yield "
";
        }
        // line 23
        yield "
";
        // line 25
        if (CoreExtension::getAttribute($this->env, $this->source, ($context["aShow"] ?? null), "question_number", [], "any", false, false, true, 25)) {
            // line 26
            yield "    <span class='";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 26), "questionnumber", [], "any", false, false, true, 26), 26, $this->source);
            yield "' ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 26), "questionnumber", [], "any", false, false, true, 26), 26, $this->source);
            yield " >
        ";
            // line 27
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aQuestion"] ?? null), "number", [], "any", false, false, true, 27), 27, $this->source);
            yield "
    </span>
";
        }
        // line 30
        yield "
";
        // line 32
        if (CoreExtension::getAttribute($this->env, $this->source, ($context["aShow"] ?? null), "question_code", [], "any", false, false, true, 32)) {
            // line 33
            yield "    <span class='";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 33), "questioncode", [], "any", false, false, true, 33), 33, $this->source);
            yield "' ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 33), "questioncode", [], "any", false, false, true, 33), 33, $this->source);
            yield ">
        ";
            // line 34
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aQuestion"] ?? null), "code", [], "any", false, false, true, 34), 34, $this->source);
            yield "
    </span>
";
        }
        // line 37
        yield "
";
        // line 39
        yield "<div class=\"";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 39), "questiontext", [], "any", false, false, true, 39), 39, $this->source);
        yield "\" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 39), "questiontext", [], "any", false, false, true, 39), 39, $this->source);
        yield ">
    <div id=\"ls-question-text-";
        // line 40
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aQuestion"] ?? null), "SGQ", [], "any", false, false, true, 40), 40, $this->source);
        yield "\" class=\"";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 40), "lsquestiontext", [], "any", false, false, true, 40), 40, $this->source);
        yield "\" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 40), "lsquestiontext", [], "any", false, false, true, 40), 40, $this->source);
        yield ">
        ";
        // line 41
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aQuestion"] ?? null), "text", [], "any", false, false, true, 41), 41, $this->source);
        yield "
    </div>
</div>
";
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "./subviews/survey/question_subviews/question_text_content.twig";
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
        return array (  102 => 41,  94 => 40,  87 => 39,  84 => 37,  78 => 34,  71 => 33,  69 => 32,  66 => 30,  60 => 27,  53 => 26,  51 => 25,  48 => 23,  42 => 21,  40 => 20,);
    }

    public function getSourceContext()
    {
        return new Source("", "./subviews/survey/question_subviews/question_text_content.twig", "/Users/emmamendez/Source/KLPS/Webite-UX-UI/limesurvey/limesurvey/themes/survey/fruity_twentythree/views/subviews/survey/question_subviews/question_text_content.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 20);
        static $filters = array("raw" => 41);
        static $functions = array("include" => 21);

        try {
            $this->sandbox->checkSecurity(
                ['if'],
                ['raw'],
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
